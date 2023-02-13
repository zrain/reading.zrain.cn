import LogoImage from '@/assets/img/little-bear-reading-logo.png';
import { HttpService } from '@/services';
import { message, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './library.view.less';

const uploadProps = {
    name: 'file',
    showUploadList: false,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};

export const LibraryView = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const [connectState, setConnectState] = useState(false);

    const state = location.state || {};
    const { ip } = state;

    const heartbeat = async () => {
        const { code } = await HttpService.connect(ip);

        if (code !== 200) {
            // navigate('/');
            message.info('APP 断开连接');
        } else {
            setConnectState(true);
        }
    };

    const fetchBooks = async () => {
        const { code, data } = await HttpService.getLibrariesList(1, 20);
        if (code === 200) {
            setBookList(data.list);
        }
    };

    // useInterval(() => {
    //     heartbeat();
    // }, 3000);

    const upload = async (formData) => {
        const { code } = await HttpService.uploadFile(formData);
        if (code === 200) {
        }
    };

    const addFileDropHandleEvent = () => {
        const dropTarget = document.getElementById('drop');

        function handleEvent(event) {
            // 阻止事件的默认行为
            event.preventDefault();
            if (event.type === 'drop') {
                console.log(`🚀 ~ handleEvent ~ event`, event);
                // 文件进入并松开鼠标,文件边框恢复正常
                const [file] = event.dataTransfer.files;

                if (file) {
                    const formData = new FormData();
                    // 这里只传 file、方便报文解析
                    formData.append('file', file);
                    upload(formData);
                }
            } else if (event.type === 'dragleave') {
                // 离开时
            } else {
                // 进入时
            }
        }
        // 拖拽事件绑定
        dropTarget.addEventListener('dragenter', handleEvent);
        dropTarget.addEventListener('dragover', handleEvent);
        dropTarget.addEventListener('drop', handleEvent);
        dropTarget.addEventListener('dragleave', handleEvent);
    };

    useEffect(() => {
        heartbeat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (connectState === true) {
            fetchBooks();
        }
    }, [connectState]);

    useEffect(() => {
        addFileDropHandleEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="drop" className="library-container">
            <div className="left">
                <div className="logo">
                    <img className="logo-image" src={LogoImage} alt="" />
                    <span>小熊阅读</span>
                </div>
                <div className="user-info">
                    <div className="avatar">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvX7ndX0dYAQ1gtkv0SFMvFbaN4ljDLaPLkw&usqp=CAU"
                            alt="avatar"
                        />
                    </div>
                    <div className="user-name">MuMonkey</div>
                    <span className="tips">阅读总时长：18888小时</span>
                </div>
            </div>
            <div className="middle">
                <div className="header">
                    <h1 className="title">书架</h1>
                    <div className="tips">
                        <div>
                            将文件拖入网页内 或
                            <Upload
                                {...uploadProps}
                                action={`http://${ip}:1127/upload`}
                            >
                                <button>选择文件上传</button>
                            </Upload>
                        </div>
                    </div>
                </div>

                <div className="scroll-view">
                    <ul className="book-list">
                        {bookList.map((bookItem) => {
                            const { id, name, cover } = bookItem;
                            const { backgroundBase64 } = cover || {};
                            console.log(
                                `🚀 ~ {bookList.map ~ bookItem`,
                                bookItem
                            );
                            return (
                                <li className="book-item" key={id}>
                                    <div className="book-cover">
                                        <img src={backgroundBase64} alt="" />
                                    </div>
                                    <div className="book-info">
                                        <p className="title">{name}</p>
                                        <a href="" className="author">
                                            作者
                                        </a>
                                    </div>
                                </li>
                            );
                        })}
                        <div className="empty-height"></div>
                    </ul>
                </div>
            </div>
            <div className="right"></div>
        </div>
    );
};

export default LibraryView;
