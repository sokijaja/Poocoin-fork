import React, { Component } from 'react';
import '../../css/advertise.css';
import InLineLink from '../../Component/InLineLink';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import bannerpreview from '../../Images/bannerpreview.png';

class Banners extends Component {
    render() {
        return (
            <div>
                <Card className={'Card'}>
                    <CardHeader
                        title="Banner Ads"
                    />
                    <hr />
                    <CardContent>
                        <p className={'fs5 fwBold'}>The pricing and purchasing of banner ads is here:</p>
                        <InLineLink
                            url="https://a-ads.com/campaigns/new?selected_site_id=489659&selected_source_type=site&partner=1602418"
                            text="https://a-ads.com/campaigns/new?selected_site_id=489659&selected_source_type=site&partner=1602418"
                            fontSize="1.25rem"
                        />
                        <hr />
                        <p>
                            The banner ads are purchased through an ad provider a-ads.com
                            <InLineLink
                                url="https://a-ads.com/campaigns/new?selected_site_id=489659&selected_source_type=site&partner=1602418"
                                text=" a-ads.com"
                                fontSize="1rem"
                            />
                        </p>
                        <p>
                            You can also purchase them by hovering on the icon in the top-right and clicking the "your ad here" link.
                        </p>
                        <p>
                            <img src={bannerpreview} width="202" height="86" className={'img-fluid border rounded'} />
                            <br />
                            <small className={'textMuted'}>
                                Preview
                            </small>
                        </p>
                        <p>
                            If your project is an un-released fair launch, or a presale that has no available presale url on your website, the ad will be limited to only appearing in the bottom left spot marked as "presale ads". It will appear in a-ads as being marked as "shady".
                        </p>
                        <p>
                            This limitation is removed after your token is launched or after you provide a presale url for unicrypt or dxsale.
                        </p>
                        <p>
                            Ads for any launched token that has less than $10k worth of BNB or stablecoin in the liquidity pool will be rejected.
                        </p>
                        <hr />
                        <p className={'mt5 pt5'}>
                            Do not DM me asking for the cost of banner ads. You will just be directed here:
                        </p>
                        <InLineLink
                            url="https://a-ads.com/campaigns/new?selected_site_id=489659&selected_source_type=site&partner=1602418"
                            text="https://a-ads.com/campaigns/new?selected_site_id=489659&selected_source_type=site&partner=1602418"
                            fontSize="1rem"
                        />
                        <hr />
                        <p>Poocoin admin contact info:</p>
                        <p>
                            Email:
                            <InLineLink
                                url="mailto://promotions@poocoin.app"
                                text=" promotions@poocoin.app"
                                fontSize="1rem"
                            />
                        </p>
                        <p>
                            Telegram admin user:
                            <InLineLink
                                url="https://t.me/fomo11"
                                text=" @fomo11"
                                fontSize="1rem"
                            />
                        </p>
                        <p>
                            Telegram public chat:
                            <InLineLink
                                url="https://t.me/poocointokenchat"
                                text=" https://t.me/poocointokenchat"
                                fontSize="1rem"
                            />
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Banners;