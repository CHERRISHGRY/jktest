package com.oxchains.themis.order.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Created by huohuo on 2017/10/26.
 */
@Entity
@Table(name = "user_tx_detail")
public class UserTxDetail {
    @Id
    private Long id;
    private Integer txNum;     //交易次数
    private Integer goodDesc;   //好评次数
    private Integer badDesc;    //差评次数
    private String firstBuyTime;  //第一次购买时间
    private String createTime;     //用户创建时间
    private Integer believeNum;    // 信任次数
    @Transient
    private Notice notice;      //公告详细信息
    @Transient
    private String emailVerify; //电子邮箱是否验证
    @Transient
    private String usernameVerify; //真实名称是否验证
    @Transient
    private String mobilePhoneVerify;//电话是否验证
    @Transient
    private String username;
    @Transient
    private String goodDegree;//好评度
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getGoodDegree() {
        return goodDegree;
    }

    public String getEmailVerify() {
        return emailVerify;
    }

    public void setEmailVerify(String emailVerify) {
        this.emailVerify = emailVerify;
    }

    public String getUsernameVerify() {
        return usernameVerify;
    }

    public void setUsernameVerify(String usernameVerify) {
        this.usernameVerify = usernameVerify;
    }

    public String getMobilePhoneVerify() {
        return mobilePhoneVerify;
    }

    public void setMobilePhoneVerify(String mobilePhoneVerify) {
        this.mobilePhoneVerify = mobilePhoneVerify;
    }

    public void setGoodDegree(String goodDegree) {
        this.goodDegree = goodDegree;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTxNum() {
        return txNum;
    }

    public void setTxNum(Integer txNum) {
        this.txNum = txNum;
    }

    public Integer getGoodDesc() {
        return goodDesc;
    }

    public void setGoodDesc(Integer goodDesc) {
        this.goodDesc = goodDesc;
    }

    public Integer getBadDesc() {
        return badDesc;
    }

    public void setBadDesc(Integer badDesc) {
        this.badDesc = badDesc;
    }

    public String getFirstBuyTime() {
        return firstBuyTime;
    }

    public void setFirstBuyTime(String firstBuyTime) {
        this.firstBuyTime = firstBuyTime;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public Integer getBelieveNum() {
        return believeNum;
    }

    public void setBelieveNum(Integer believeNum) {
        this.believeNum = believeNum;
    }

    public Notice getNotice() {
        return notice;
    }

    public void setNotice(Notice notice) {
        this.notice = notice;
    }

    @Override
    public String toString() {
        return "UserTxDetail{" +
                "id=" + id +
                ", txNum=" + txNum +
                ", goodDesc=" + goodDesc +
                ", badDesc=" + badDesc +
                ", firstBuyTime='" + firstBuyTime + '\'' +
                ", createTime='" + createTime + '\'' +
                ", believeNum=" + believeNum +
                ", notice=" + notice +
                ", emailVerify='" + emailVerify + '\'' +
                ", usernameVerify='" + usernameVerify + '\'' +
                ", mobilePhoneVerify='" + mobilePhoneVerify + '\'' +
                ", goodDegree='" + goodDegree + '\'' +
                '}';
    }
}