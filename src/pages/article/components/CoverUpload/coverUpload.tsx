/**
 * @description Index
 * @author ShiLin
 * @date 2020/5/31 12:23 下午
 */
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import './index.less';
import { UploadChangeParam } from 'antd/lib/upload/interface';

interface CoverUploadProp {
  coverImage: string;
  setCoverImage: (data: string) => void;
}

interface StateType {
  loading: boolean;
}

/* function getBase64(img: File | Blob | undefined, callback: { (imageUrl: any): void; (arg0: (string | ArrayBuffer | null)): any }) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img as Blob);
} */

function beforeUpload(file: { type: string; size: number }) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class CoverUpload extends React.Component<CoverUploadProp, StateType> {
  constructor(props: Readonly<CoverUploadProp>) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        loading: false,
      });
      this.props.setCoverImage(info.file.response.data);

      // Get this url from response in real world.
      /* getBase64(info.file.originFileObj, (imageUrl: any) => {
          this.setState({
            loading: false,
          });
          this.props.setCoverImage(imageUrl);
        },
      ); */
    }
  };

  render() {
    const { coverImage } = this.props;

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">上传</div>
      </div>
    );

    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload/file"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {coverImage ? (
          <img src={coverImage} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default CoverUpload;
