package com.oxchains.themis.order.entity;
import lombok.Data;

import javax.persistence.*;

/**
 * Created by huohuo on 2017/10/28.
 * @author huohuo
 */
@Entity
@Table(name = "order_comment")
@Data
public class OrderComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderId;
    private Integer sellerStatus;
    private Integer buyerStatus;
    private String buyerContent;
    private String sellerContent;
    @Transient
    private Long userId;
    @Transient
    private String content;
    @Transient
    private Integer status;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "OrderComment{" +
                "id=" + id +
                ", orderId='" + orderId + '\'' +
                ", sellerStatus=" + sellerStatus +
                ", buyerStatus=" + buyerStatus +
                ", buyerContent='" + buyerContent + '\'' +
                ", sellerContent='" + sellerContent + '\'' +
                ", userId=" + userId +
                ", content='" + content + '\'' +
                '}';
    }
}
