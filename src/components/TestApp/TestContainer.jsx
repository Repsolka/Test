import React from 'react';
import {connect} from "react-redux";
import {
    cancelRequest,
    dataIsFetching,
    setState,
    updateFirstFieldText,
    updateSecondFieldText,
    updateThirdFieldOption
} from "../../redux/test-reducer"
import Page from "./Page";
import DialogWindow from "../../common/DialogWindow/DialogWindow";

class TestContainer extends React.Component {
    constructor(props) {
        super(props);
        this.firstFieldValueRef = React.createRef();
        this.secondFieldValueRef = React.createRef();
        this.thirdFieldValueRef = React.createRef();
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        this.props.dataIsFetching(true);
        this.worker = new Worker('../../worker.js');
    }

    componentDidMount() {
        console.log("didMount")

        this.getData({url: 'http://test.clevertec.ru/tt/meta/', form: undefined, method: 'get'})
            .then((value) => {
                this.props.setState(value.title, value.image, value.fields)
            })
    }

    getData(WorkedData) {
        return new Promise((resolve, reject) => {

            this.worker.onmessage = function (e) {
                if (WorkedData.method === 'get') {
                    console.log(e.data)
                    resolve(e.data)
                }
                if (WorkedData.method === 'post') {
                    console.log(e.data)
                    resolve(e.data)
                }
            };
            this.worker.postMessage(WorkedData);
        })
    }

    onFirstFormChange = (value) => {
        console.log("change")
        this.props.updateFirstFieldText(this.firstFieldValueRef.current.value);
    }
    onSecondFieldChange = () => {
        console.log("change2")
        this.props.updateSecondFieldText(this.secondFieldValueRef.current.value);
    }
    onThirdFieldChange = () => {
        console.log("change3")
        console.log(this.thirdFieldValueRef.current.value)
        this.props.updateThirdFieldOption(this.thirdFieldValueRef.current.value);
    }
    onAbortButtonClick = () => {
        this.worker.terminate();
        this.props.cancelRequest();
    }
    onSendButtonClick = (event) => {
        this.props.dataIsFetching(true)
        event.preventDefault();
        console.log('Send button clicked')
        this.getData({
            url: 'http://test.clevertec.ru/tt/data', form: {
                text: this.props.firstFieldText,
                numeric: this.props.secondFieldText,
                list: this.props.thirdFieldOption
            }, method: 'post'
        })
            .then((value) => {
                alert(value)
            })
    }

    render() {
        if (this.props.isFetching === true) {
            if (this.props.isRequestCanceled === true) {
                return (
                    <div>Запрос отменён пользователем. Перезагрузите страницу</div>
                )
            } else {
                return (
                    <DialogWindow onAbortButtonClick={this.onAbortButtonClick}/>
                )
            }
        } else {
            return <Page
                isFetching={this.props.isFetching}
                title={this.props.title}
                image={this.props.image}
                fields={this.props.fields}
                firstFieldText={this.props.firstFieldText}
                firstFieldValue={this.firstFieldValueRef}
                secondFieldText={this.props.secondFieldText}
                secondFieldValue={this.secondFieldValueRef}
                thirdFieldValue={this.thirdFieldValueRef}
                onFirstFormChange={this.onFirstFormChange}
                onSendButtonClick={this.onSendButtonClick}
                onSecondFieldChange={this.onSecondFieldChange}
                onThirdFieldChange={this.onThirdFieldChange}
                onAbortButtonClick={this.onAbortButtonClick}
            />
        }
    }
}

let mapStateToProps = (state) => {
    return {
        title: state.testPage.title,
        image: state.testPage.image,
        fields: state.testPage.fields,
        firstFieldText: state.testPage.firstFieldText,
        secondFieldText: state.testPage.secondFieldText,
        thirdFieldOption: state.testPage.thirdFieldOption,
        isFetching: state.testPage.isFetching,
        isRequestCanceled: state.testPage.isRequestCanceled
    }
}

export default connect(mapStateToProps, {
    setState,
    updateFirstFieldText,
    updateSecondFieldText,
    updateThirdFieldOption,
    dataIsFetching,
    cancelRequest
})(TestContainer);