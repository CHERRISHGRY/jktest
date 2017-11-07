/**
 * Created by zhangxiaojing on 2017/10/24.
 */
import React,{ Component }from 'react';
import {connect} from 'react-redux';
import { Pagination } from 'antd';
import {Alert,Modal,Button,Form,FormGroup,Col,ControlLabel,FormControl,Image} from 'react-bootstrap';
import {fetchArbitrateList,fetchEvidence,arbitrateResult} from '../actions/arbitrate';
import {ROOT_ARBITRATE} from '../actions/types'


class RefereeList extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false,
            pageSize:8, //每页显示的条数8条
            result:1
        }
        this.renderrow = this.renderrow.bind(this);
    }
    componentWillMount(){
        const userId=localStorage.getItem("userId")
        const userIdDate={
            userId:userId,
            pageNum:1,
            pageSize:this.state.pageSize, //每页显示的条数8条
        }
        this.props.fetchArbitrateList({userIdDate});
    }
    showEvidence(item){
        console.log(item)
        const orderId={
            id:item
        }
        this.props.fetchEvidence({orderId});
        console.log(this.props.evidenceData)
        this.setState({
            show:true
        })
    }
    handleArbitrate(){
        const userId=localStorage.getItem("userId")
        console.log(this.props.evidenceData.orderId)
        const resultData={
            id:this.props.evidenceData.orderId,
            userId:userId,
            successId:this.state.result
        }
        this.props.arbitrateResult({resultData})
        this.setState({
            show:false
        })
    }
    renderrow() {
        return this.props.arbitrate_list.map((item,index)=>{
            const userId=localStorage.getItem("userId")
            return (
                <tr key={index}>
                    <td >
                        <div>买方:{item.buyerUsername}</div>
                        <div>卖方:{item.sellerUsername}</div>
                    </td>
                    <td>{item.id}</td>
                    <td>{item.money}</td>
                    <td>{item.amount}</td>
                    <td>{item.createTime}</td>
                    <td>{item.orderStatusName}</td>
                    <td>{item.status == 1 ? <button className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.showEvidence.bind(this,item.id)}>仲裁</button> : ""}</td>
                </tr>
            )
        })
    }
    handleRadioValue(e){
        this.setState({result:e.target.value})
    }
    onPagination(pageNum) {
        const userId=localStorage.getItem("userId")
        const userIdDate={
            userId:userId,
            pageNum:pageNum,
            pageSize:this.state.pageSize, //每页显示的条数8条
        }
        this.props.fetchArbitrateList({userIdDate});
    }
    render() {
        let close = () => {
            this.setState({show:false})
        };
        const arbitrate_list=this.props.arbitrate_list;
        const evidenceData = this.props.evidenceData;
        const totalNum = arbitrate_list && arbitrate_list[0].pageCount
        const buyerContent = evidenceData && evidenceData.buyerContent;
        const sellerContent = evidenceData && evidenceData.sellerContent;
        const buyerFiles = evidenceData && evidenceData.buyerFiles;
        const sellerFiles = evidenceData && evidenceData.sellerFiles;
        console.log(evidenceData)
        console.log(totalNum)
        return (
            <div className="container">
                <div className="referee-list  g-pt-50 g-pb-50">
                    <h3 className="h3 text-center g-pb-20">仲裁人消息列表</h3>
                    <div className="table-responsive">
                        <div className="table table-striped table-bordered table-hover">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>交易人</th>
                                    <th>订单编号</th>
                                    <th>交易金额</th>
                                    <th>交易数量</th>
                                    <th>创建时间</th>
                                    <th>交易状态</th>
                                    <th>仲裁操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.arbitrate_list == null ? <tr><td colSpan={8}>暂无数据</td></tr> : this.renderrow()}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagecomponent">
                            <Pagination  defaultPageSize={this.state.pageSize} total={totalNum}  onChange={e => this.onPagination(e)}/>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.show} onHide={close} container={this} aria-labelledby="contained-modal-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title text-center">证据存根</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row  margin-b-15 ">
                            <label className="col-sm-4 control-label text-right"><strong>买家附件</strong></label>
                            <div className="col-sm-8 g-pb-10 ">
                                {buyerFiles ?  <a className="btn btn-default" style={{color: "gray"}}
                                                  href={`${ROOT_ARBITRATE}/arbitrate/${buyerFiles}/downloadfile`}
                                                  download="download">点击下载</a> : "暂无数据" }

                            </div>
                            <label className="col-sm-4 control-label text-right"><strong>卖家附件</strong></label>
                            <div className="col-sm-8 g-pb-10 ">
                                {sellerFiles ? <a className="btn btn-default" style={{color: "gray"}}
                                                  href={`${ROOT_ARBITRATE}/arbitrate/${sellerFiles}/downloadfile`}
                                                  download="download">点击下载</a> : "暂无数据"}

                            </div>
                            <label className="col-sm-4 control-label text-right"><strong>买家备注</strong></label>
                            <div className="col-sm-8 g-pb-10">
                                <span>{buyerContent ? buyerContent:"暂无数据"}</span>
                            </div>
                            <label className="col-sm-4 control-label text-right"><strong>卖家备注</strong></label>
                            <div className="col-sm-8 g-pb-10">
                                <span>{sellerContent ? sellerContent :"暂无数据"}</span>
                            </div>
                            <div className="col-sm-12 text-center g-pb-20">
                                <span className="h4">仲裁胜利方</span>
                            </div>

                            <div className="col-sm-6 text-right">
                                <label htmlFor="arbitrate1"><input type="radio" id="arbitrate1" name="arbitrate" value='1' defaultChecked onClick={this.handleRadioValue.bind(this)}/>买家</label>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="arbitrate2"> <input type="radio" id="arbitrate2" name="arbitrate" value='2' onClick={this.handleRadioValue.bind(this)}/>卖家</label>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleArbitrate.bind(this)}>确定</Button>
                        <Button onClick={close}>取消</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        arbitrate_list: state.arbitrate.arbitrate_list,
        evidenceData:state.arbitrate.get_evidence
    };
}
export default connect(mapStateToProps,{fetchArbitrateList,fetchEvidence,arbitrateResult})(RefereeList);