package com.oxchains.chat.common;

import io.netty.channel.Channel;

/**
 * Created by xuqi on 2017/10/19.
 */
public class ChannelHandler {
    private Channel channel;
    private long lastUseTime;
    public Channel getChannel() {
        return channel;
    }

    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    public long getLastUseTime() {
        return lastUseTime;
    }

    public void setLastUseTime(long lastUseTime) {
        this.lastUseTime = lastUseTime;
    }

    public ChannelHandler(Channel channel, long lastUseTime) {
        this.channel = channel;
        this.lastUseTime = lastUseTime;
    }
}
