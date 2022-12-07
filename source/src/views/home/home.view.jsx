import './home.view.less';
import LogoImage from '@/assets/img/little-bear-reading-logo.png';
import PhoneScreen from '@/assets/img/home-screen.png';
import { ReactComponent as AppStoreDownloadSVG } from '@/assets/img/app-store-download.svg';
import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="first-screen screen">
                <div className="up-split">
                    <div className="arrow-up"></div>
                    <div className="left-radius"></div>
                    <div className="right-radius"></div>
                </div>

                <div className="left">
                    <div className="left-inner">
                        <div className="logo">
                            <img
                                className="logo-image"
                                src={LogoImage}
                                alt=""
                            />
                            <span>小熊阅读</span>
                        </div>
                        <div className="phone-screen-container">
                            <img src={PhoneScreen} alt="" />
                        </div>
                        <div className="card background">
                            <div className="card top">
                                <div className="card left"></div>
                                <div className="card right"></div>
                                <div className="mask"></div>
                            </div>
                            <div className="bottom">
                                <div className="card left"></div>
                                <div className="card right"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="header">
                        {/* <ul className="nav">
                        <li className="nav-item">
                            <span>书架</span>
                        </li>
                    </ul> */}
                        <div
                            className="button"
                            onClick={() => {
                                navigate('/wifi');
                            }}
                        >
                            WiFi 传书
                        </div>
                    </div>

                    <div className="middle">
                        <h1 className="title">小熊阅读</h1>
                        <div className="description">
                            <p>优美的设计、专注于本地阅读工具的最佳体验。</p>
                            <p>优美的设计、专注于本地阅读工具的最佳体验。</p>
                            <p>优美的设计、专注于本地阅读工具的最佳体验。</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <a
                            href="https://apps.apple.com/cn/app/%E5%B0%8F%E7%86%8A%E9%98%85%E8%AF%BB-%E5%BF%85%E5%A4%87%E6%8E%A8%E8%8D%90/id6444844418"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <AppStoreDownloadSVG className="app-store-download-button" />
                        </a>
                    </div>
                </div>
            </div>
            {/* <div className="second-screen screen"></div> */}
        </div>
    );
};

export default HomeView;
