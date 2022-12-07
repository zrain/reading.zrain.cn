import { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import LogoImage from '@/assets/img/little-bear-reading-logo.png';
import './wifi.view.less';
import { useNavigate } from 'react-router-dom';

function isNumber(val) {
    var regPos = /^[0-9]+.?[0-9]*/; //判断是否是数字。

    if (regPos.test(val)) {
        return true;
    } else {
        return false;
    }
}

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    }
};

const getIpByCode = (str) => {
    if (!str) {
        return;
    }
    let numbers = str.split('').map((i) => parseInt(i, 10));
    let k = numbers.pop();
    numbers = numbers.map((i) => {
        if (i < k) {
            return Math.abs(i + 10 - k);
        }
        return Math.abs(i - k);
    });

    let r = numbers.pop();
    let l = 3;
    if (r !== 6) {
        l = numbers.pop();
    }

    const ip1 = numbers.slice(0, l).join('');
    const ip2 = numbers.slice(l, r).join('');

    const ip = `192.168.${ip1}.${ip2}`;

    return ip;
};

export const WifiView = () => {
    const navigate = useNavigate();

    const input0 = useRef();
    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();
    const input5 = useRef();
    const input6 = useRef();
    const input7 = useRef();

    const inputs = [
        input0,
        input1,
        input2,
        input3,
        input4,
        input5,
        input6,
        input7
    ];

    const connect = async (ip) => {
        const res = await axios.get(`http://${ip}:1127/connect`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    const getPassword = () => {
        return inputs
            .map((ref) => {
                return ref.current.value;
            })
            .join('');
    };

    const inputOk = async () => {
        const password = getPassword();
        const ip = getIpByCode(password);
        const { code } = await connect(ip);
        if (code === 200) {
            navigate('/library');
        }
    };

    const findFocusInputIndex = () => {
        return inputs.findIndex((ref) => {
            return ref.current === document.activeElement;
        });
    };

    const findFirstEmptyRef = (callback) => {
        const r = inputs.find((ref) => {
            const value = ref.current.value;
            if (value !== '' && value !== null && value !== undefined) {
                return false;
            }
            return true;
        });

        if (r && callback instanceof Function) {
            callback(r);
        } else {
            const index = findFocusInputIndex();
            inputs[index].current.blur();
            inputOk();
        }
    };

    useEffect(() => {
        let targetInputValue = '';
        let targetInputIndex = -1;

        window.addEventListener('keydown', (e) => {
            const index = findFocusInputIndex();
            if (index !== -1) {
                targetInputIndex = index;
                targetInputValue = e.target.value;
            } else {
                targetInputValue = '';
            }
        });

        window.addEventListener('keyup', (e) => {
            // 处理删除动作
            if (e.key === 'Backspace') {
                // 当没有聚焦的 input 但是敲击了删除健时、删除最后一个数字
                // 没有 input 聚焦
                if (targetInputIndex === -1) {
                    const [lastRef] = [...inputs].reverse();
                    lastRef.current.value = '';
                    lastRef.current.focus();
                } else {
                    if (targetInputValue === '') {
                        if (inputs[targetInputIndex - 1]) {
                            inputs[targetInputIndex - 1].current.value = '';
                            inputs[targetInputIndex - 1].current.focus();
                        }
                    }
                }
            } else {
                // 没有焦点
                if (targetInputIndex === -1) {
                    if (isNumber(e.key)) {
                        findFirstEmptyRef((ref) => {
                            ref.current.value = e.key;

                            findFirstEmptyRef((nextRef) => {
                                nextRef.current.focus();
                            });
                        });
                    }
                } else {
                    // 有焦点
                    // 输入框为空
                    if (targetInputValue === '') {
                        if (!isNumber(e.key)) {
                            inputs[targetInputIndex].current.value = '';
                        } else {
                            findFirstEmptyRef((ref) => {
                                ref.current.focus();
                            });
                        }
                    } else {
                        // 输入框不为空
                        if (isNumber(e.key)) {
                            inputs[targetInputIndex].current.value = e.key;
                            findFirstEmptyRef((ref) => {
                                ref.current.focus();
                            });
                        }
                    }
                }
            }

            targetInputValue = '';
            targetInputIndex = -1;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="wifi-container">
            <div className="title">
                <div className="logo">
                    <img className="logo-image" src={LogoImage} alt="" />
                    <span>小熊阅读</span>
                </div>
            </div>
            <div className="password-input">
                <input ref={input0} maxLength={1} autoFocus />
                <input ref={input1} maxLength={1} />
                <input ref={input2} maxLength={1} />
                <input ref={input3} maxLength={1} />
                <input ref={input4} maxLength={1} />
                <input ref={input5} maxLength={1} />
                <input ref={input6} maxLength={1} />
                <input ref={input7} maxLength={1} />
            </div>
            <div className="description">
                <p>打开APP内的传书页面，输入密码即可开始传书～</p>
            </div>
            {/*<Dragger {...props} action={`http://${ip}:1127/upload`}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                </p>
            </Dragger> */}
        </div>
    );
};

export default WifiView;
