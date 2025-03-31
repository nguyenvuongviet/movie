import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Switch,
  InputNumber,
  notification,
} from "antd";
import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieInfo,
  updateMovie,
  createMovie,
  resetMovieInfo,
} from "./slice";
import dayjs from "dayjs";

export default function AddMoviePage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { movieInfo, loading } = useSelector((state) => state.movieReducer);

  const [fileList, setFileList] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieInfo(id));
    }
    return () => dispatch(resetMovieInfo());
  }, [dispatch, id]);

  useEffect(() => {
    if (movieInfo) {
      form.setFieldsValue({
        ...movieInfo,
        ngayKhoiChieu: dayjs(movieInfo.ngayKhoiChieu, "YYYY-MM-DDTHH"),
      });
      setImgPreview(movieInfo.hinhAnh);
    } else {
      form.resetFields();
      setImgPreview(null);
      setFileList([]);
    }
  }, [movieInfo, form]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    Object.entries({
      tenPhim: values.tenPhim,
      trailer: values.trailer,
      moTa: values.moTa,
      ngayKhoiChieu: dayjs(values.ngayKhoiChieu).format("DD/MM/YYYY"),
      sapChieu: values.sapChieu,
      dangChieu: values.dangChieu,
      hot: values.hot,
      danhGia: values.danhGia,
    }).forEach(([key, value]) => formData.append(key, value));

    const image =
      values.hinhAnh?.fileList?.[0]?.originFileObj || values.hinhAnh;
    if (image) formData.append("hinhAnh", image);

    if (id) formData.append("maPhim", id);

    dispatch(id ? updateMovie(formData) : createMovie(formData))
      .unwrap()
      .then(() => {
        notification.success({
          message: `${id ? "Cập nhật" : "Thêm"} phim thành công!`,
          placement: "bottomRight",
        });
        navigate("/admin/list-movie");
      })
      .catch((error) => {
        notification.error({
          message: `${id ? "Cập nhật" : "Thêm"} thất bại!`,
          description: error || "Có lỗi xảy ra!",
          placement: "bottomRight",
        });
      });
  };

  const handleImageChange = ({ fileList }) => {
    const latestFileList = fileList.slice(-1);
    setFileList(latestFileList);

    if (latestFileList.length > 0) {
      const file = latestFileList[0].originFileObj;
      setImgPreview(URL.createObjectURL(file));
    } else {
      setImgPreview(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-gray-100 min-h-screen">
      <h2 className="text-left text-2xl font-bold w-full pb-4">
        {id ? "Cập Nhật Phim" : "Thêm Phim"}
      </h2>

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            sapChieu: true,
            dangChieu: false,
            hot: false,
            danhGia: 10,
          }}
        >
          <Form.Item
            label={<span className="text-sm font-medium">Tên phim</span>}
            name="tenPhim"
            rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
          >
            <Input
              prefix={<VideoCameraOutlined />}
              placeholder="Nhập tên phim"
              className="text-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-sm font-medium">Link trailer</span>}
            name="trailer"
          >
            <Input
              prefix={<VideoCameraOutlined />}
              placeholder="Nhập link trailer"
              className="text-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-sm font-medium">Mô tả phim</span>}
            name="moTa"
          >
            <Input.TextArea
              placeholder="Nhập mô tả phim"
              rows={3}
              className="text-lg"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={
                <span className="text-sm font-medium">Ngày khởi chiếu</span>
              }
              name="ngayKhoiChieu"
              rules={[
                { required: true, message: "Vui lòng chọn ngày khởi chiếu!" },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" className="w-full text-lg" />
            </Form.Item>

            <Form.Item
              label={<span className="text-sm font-medium">Đánh giá</span>}
              name="danhGia"
            >
              <InputNumber min={1} max={10} className="w-full text-lg" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            <Form.Item
              name="dangChieu"
              label={<span className="text-sm font-medium">Đang chiếu</span>}
              valuePropName="checked"
              className="mb-0"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="sapChieu"
              label={<span className="text-sm font-medium">Sắp chiếu</span>}
              valuePropName="checked"
              className="mb-0"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="hot"
              label={<span className="text-sm font-medium">Hot</span>}
              valuePropName="checked"
              className="mb-0"
            >
              <Switch />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="text-sm font-medium">Hình ảnh</span>}
            name="hinhAnh"
            rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
          >
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleImageChange}
              showUploadList={true}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          {imgPreview && (
            <div className="flex justify-start">
              <img
                src={imgPreview}
                alt="preview"
                className="w-32 h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="text-lg py-5 mt-3 font-bold"
              loading={loading}
            >
              {id ? "Cập Nhật Phim" : "Thêm Phim"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
