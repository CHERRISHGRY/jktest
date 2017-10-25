/**
 * Created by oxchain on 2017/10/18.
 */

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser ,GetverifyCode} from '../../actions/auth'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            spin : false,
            error: null,
            actionResult: '',
            count: 60,
            liked: true,
            index:2,
            choosenum:''
        };
        this.handlesend = this.handlesend.bind(this)
    }

    hideModal = () => {
        this.setState({
            isModalOpen: false
        });
    };
    handleFormSubmit({ loginname, mobilephone, email,password }) {
       //  this.setState({ choosenum:this.state.index });
       // const choosenum = this.state.choosenum
       //  console.log("choosenum" + this.state.choosenum)
        if(loginname && password && mobilephone)
            this.props.signupUser({ loginname, mobilephone, email,password }, err => {
                this.setState({ isModalOpen: true , error: err , actionResult: err||'注册成功!' , spin:false });
            });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger alert-dismissable">
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    handlesend(){
        if(this.state.liked){
            this.timer = setInterval(function () {
                var count = this.state.count;
                this.state.liked = false;
                count -= 1;
                if (count < 1) {
                    this.setState({
                        liked: true
                    });
                    count = 60;
                    clearInterval(this.timer);
                }
                this.setState({
                    count: count
                });
            }.bind(this), 1000);
        }
        const phonenum = localStorage.getItem("phonenum")
        this.props.GetverifyCode({phonenum},()=>{})

    }
    handleChange(e) {
        let {index} = this.state;
        index++;
        if (index%2 == 0) {
            index = 2;
        }else {
            index = 1;
        }
        this.setState({
            index
        })
        console.log("选中状态" + this.state.index)
    }
    phoneChange(e){
        console.log(e.target.value)
        const phonenum = localStorage.setItem("phonenum",e.target.value)

        var regex = /^1[3|4|5|8][0-9]\d{4,8}$/
        if (regex.test(e.target.value) ) {

        } else{
            alert('请输入正确的手机号码！');
        }
    }


    renderField({ input, label, type, icon, meta: { touched, error } }) {
        return (
            <div className={`form-style ${touched && error ? 'has-error' : ''}`}>
                <input {...input} placeholder={label} type={type} className="form-control "/>
                {/*<span className={`glyphicon glyphicon-${icon} form-control-feedback`}></span>*/}
                {/*<div className="help-block ">{touched && error ? error : ''}</div>*/}
            </div>
        )}
    render() {
        const { handleSubmit} = this.props;

        var text = this.state.liked ? '发送验证码' : this.state.count + ' s 后重新发' ;
        return (
            <div>
                <div className="login-box">
                    <div className="form-style">
                        <div className=" login-box-msg" style={{fontSize: 24+'px'}}>手机注册</div>
                    </div>

                    <div className="login-box-body form-style">

                        {this.renderAlert()}
                        <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <Field name="loginname" component={this.renderField} type="text"  label="请输入用户名"  />
                            <Field name="mobilephone" component={this.renderField} type="text"  onBlur={this.phoneChange} label="请输入手机号"  />
                            <div className="form-style-test">
                               <Field name="email" className="form-test " component={this.renderField} type="text" label="请输入验证码"/>
                                <span className={`send-testcode  ${this.state.liked?"" :"time-color"}`} onClick={this.handlesend}>{text}</span>
                            </div>
                            <Field name="password" component={this.renderField} type="password" label="请输入密码" icon="lock" />
                            <div className="row ">
                                <div className="form-style checkbox-margin">
                                    <input type="checkbox"  defaultChecked className="checkbox-width"  onChange={this.handleChange.bind(this)}/><span> 我已阅读themis用户手册及相关法律</span>
                                </div>
                                <div className="form-style">
                                    <button type="submit" className="btn   form-register"><i className={`fa fa-spinner fa-spin ${this.state.spin?'':'hidden'}`}></i> 注册</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                <Modal isOpen={this.state.isModalOpen} onRequestHide={this.hideModal}>
                    <ModalHeader>
                        <ModalClose onClick={this.hideModal}/>
                        <ModalTitle>提示:</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <p className={this.state.error?'text-red':'text-green'}>
                            {this.state.actionResult}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-default' onClick={this.hideModal}>
                            <a href="/signin" style={{color:black}}>关闭</a>
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
// const validate = values => {
//     const errors = {};
//
//     if(!values.mobilephone) {
//         errors.loginname = '不能为空';
//     }
//
//     if(!values.mobilephone) {
//         errors.mobilephone = '不能为空';
//     }
//     if(!values.email) {
//         errors.email = '不能为空';
//     }
//     if(!values.password) {
//         errors.password = '不能为空';
//     }
//     return errors
// };

function mapStateToProps(state) {
    // console.log(state)
    return {
        success: state.auth.authenticated,
        errorMessage: state.auth.error
    };
}

const reduxSignupForm = reduxForm({
    form: 'SignForm',
    // validate
})(Signup);

export default connect(mapStateToProps, { signupUser ,GetverifyCode})(reduxSignupForm);
