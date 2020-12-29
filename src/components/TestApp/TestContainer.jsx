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
import AbortDialogWindow from "../../common/AbortDialogWindow/AbortDialogWindow";

class TestContainer extends React.Component {
    constructor(props) {
        super(props);
        this.firstFieldValueRef = React.createRef();
        this.secondFieldValueRef = React.createRef();
        this.thirdFieldValueRef = React.createRef();
        this.props.dataIsFetching(true);
        this.worker = new Worker('../../worker.js');
        this.amountOfElements = 0;
        this.thirdProperties = null;
        this.thirdValues = null;
    }

    componentDidMount() {

        this.getData({url: 'http://test.clevertec.ru/tt/meta/', form: undefined, method: 'get'})
            .then((value) => {
                this.props.setState(value.title, value.image, value.fields)
            })
            .then((value) => {
                this.setValues();
            })
    }

    getData(WorkedData) {
        return new Promise((resolve, reject) => {

            this.worker.onmessage = function (e) {
                if (WorkedData.method === 'get') {
                    resolve(e.data)
                }
                if (WorkedData.method === 'post') {
                    resolve(e.data)
                }
            };
            this.worker.postMessage(WorkedData);
        })
    }

    setValues = () => {
        this.thirdProperties = Object.keys(this.props.fields[2].values).map((value) => {
            this.amountOfElements++;
            return value;
        })
        this.thirdValues = Object.values(this.props.fields[2].values).map((value) => {
            return value;
        })
    }

    onFirstFormChange = () => {
        this.props.updateFirstFieldText(this.firstFieldValueRef.current.value);
    }
    onSecondFieldChange = () => {
        this.props.updateSecondFieldText(this.secondFieldValueRef.current.value);
    }
    onThirdFieldChange = () => {
        for (let i = 0; i < this.amountOfElements; i++) {
            if (this.thirdFieldValueRef.current.value === this.thirdValues[i]) {
                this.props.updateThirdFieldOption(this.thirdFieldValueRef.current.value, this.thirdProperties[i]);
            }
        }
    }
    onAbortButtonClick = () => {
        this.worker.terminate();
        this.props.cancelRequest();
    }
    onReloadButtonClick = () => {
        document.location.reload(true);
    }
    onSendButtonClick = (event) => {
        this.props.dataIsFetching(true)
        event.preventDefault();
        this.getData({
            url: 'http://test.clevertec.ru/tt/data', form: {
                text: this.props.firstFieldText,
                numeric: this.props.secondFieldText,
                list: this.props.propName
            }, method: 'post'
        })
            .then((value) => {
                this.props.dataIsFetching(false)
                document.location.reload(true);
                alert(value);
            })
    }

    render() {
        if (this.props.isFetching === true) {
            if (this.props.isRequestCanceled === true) {
                return (
                    <AbortDialogWindow onReloadButtonClick={this.onReloadButtonClick}/>
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
        propName: state.testPage.propName,
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