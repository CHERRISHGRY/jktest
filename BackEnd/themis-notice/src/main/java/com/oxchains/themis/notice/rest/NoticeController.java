package com.oxchains.themis.notice.rest;

import com.oxchains.themis.notice.auth.RestResp;
import com.oxchains.themis.notice.domain.Notice;
import com.oxchains.themis.notice.service.NoticeService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author luoxuri
 * @create 2017-10-25 10:21
 **/
@RestController
@RequestMapping(value = "/notice")
public class NoticeController {

    @Resource
    private NoticeService noticeService;

    /**
     * 发布公告
     * @param notice
     * @return
     */
    @PostMapping(value = "/broadcast")
    public RestResp broadcastNotice(@RequestBody Notice notice){
        return noticeService.broadcastNotice(notice);
    }

    /**
     * 随机查询两条购买公告、两条出售公告
     * @return
     */
    @GetMapping(value = "/query/random")
    public RestResp queryRandomNotice(){
        return noticeService.queryRandomNotice();
    }

    /**
     * 查询所有公告
     * @return
     */
    @GetMapping(value = "/query/all")
    public RestResp queryAllNotice(){
        return noticeService.queryAllNotice();
    }

    /**
     * 根据交易状态查询自己的公告
     * @param userId    登录id
     * @param noticeType    公告类型
     * @param txStatus  交易状态
     * @return
     */
    @GetMapping(value = "/query/me2")
    public RestResp queryMeAllNotice(@RequestParam Long userId, @RequestParam Long noticeType, @RequestParam Integer txStatus){
        return noticeService.queryMeAllNotice(userId, noticeType, txStatus);
    }

    /**
     * 实时获取(火币网)BTC价格
     * @return
     */
    @GetMapping(value = "/query/BTCPrice")
    public RestResp queryBTCPrice(){
        return noticeService.queryBTCPrice();
    }

    /**
     * 实时获取(火币网)BTC行情信息
     * @return
     */
    @GetMapping(value = "/query/BTCMarket")
    public RestResp queryBTCMarket(){
        return noticeService.queryBTCMarket();
    }

    /**
     * 搜索购买公告
     * @param notice
     * @return
     */
    @PostMapping(value = "search/page/buy")
    public RestResp searchBuyPage(@RequestBody Notice notice){
        if (null == notice.getSearchType()) {
            notice.setSearchType(1);
        }
        /* 1 默认是搜公告 */
        if (notice.getSearchType() == 1){
            return noticeService.searchBuyPage(notice);
        }else {
            return noticeService.searchBuyPage(notice);
        }
    }

    /**
     * 搜索出售公告
     * @param notice
     * @return
     */
    @PostMapping(value = "search/page/sell")
    public RestResp searchSellPage(@RequestBody Notice notice){
        if (null == notice.getSearchType()) {
            notice.setSearchType(1);
        }
        /* 1 默认是搜公告 */
        if (notice.getSearchType() == 1){
            return noticeService.searchSellPage(notice);
        }else {
            return noticeService.searchSellPage(notice);
        }
    }

    /**
     * 下架公告
     * @param id    公告id
     * @return
     */
    @GetMapping(value = "/stop")
    public RestResp stopNotice(@RequestParam Long id){
        return noticeService.stopNotice(id);
    }

    /**
     * 状态列表
     * @return
     */
    @GetMapping(value = "/query/statusKV")
    public RestResp queryStatusKV(){
        return noticeService.queryStatusKV();
    }

}
