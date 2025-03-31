import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTheaterSystem,
  fetchTheaterCluster,
  createShowTime,
} from "./slice";
import { fetchMovieInfo } from "../AddMovie/slice";
import { useParams } from "react-router-dom";
import {
  Form,
  Select,
  DatePicker,
  InputNumber,
  Button,
  notification,
  Spin,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;

export default function ShowTime() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();

  const { theaterSystems, theaterClusters, loading, error } = useSelector(
    (state) => state.showTimeReducer
  );
  const { movieInfo, loading: movieLoading } = useSelector(
    (state) => state.movieReducer
  );

  useEffect(() => {
    dispatch(fetchMovieInfo(id));
    dispatch(fetchTheaterSystem());
  }, [dispatch, id]);

  const handleTheaterSystemChange = (theaterSystemId) => {
    dispatch(fetchTheaterCluster(theaterSystemId));
  };

  const onFinish = (values) => {
    const showTimeData = {
      maPhim: movieInfo.maPhim,
      ngayChieuGioChieu: dayjs(values.date).format("DD/MM/YYYY HH:mm:ss"),
      maRap: values.theaterCluster,
      giaVe: values.price,
    };
    
    dispatch(createShowTime(showTimeData))
      .unwrap()
      .then(() => {
        notification.success({ message: "Tạo lịch chiếu thành công!" });
        form.resetFields();
      })
      .catch((err) => {
        notification.error({
          message: "Lỗi tạo lịch chiếu",
          description: err.message,
        });
      });
  };

  if (movieLoading) return <Spin size="large" />;

  return (
    <div className="p-6 bg-white shadow-md rounded-md flex gap-6">
      <div className="w-1/3 flex justify-center items-center">
        <img
          src={movieInfo?.hinhAnh}
          alt={movieInfo?.tenPhim}
          className="w-full max-w-[300px] rounded-md shadow-lg object-cover aspect-[2/3]"
        />
      </div>

      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">
          Tạo lịch chiếu - {movieInfo?.tenPhim}
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ price: 75000 }}
        >
          <Form.Item
            label="Hệ thống rạp"
            name="theaterSystem"
            rules={[{ required: true, message: "Vui lòng chọn hệ thống rạp" }]}
          >
            <Select
              placeholder="Chọn hệ thống rạp"
              onChange={handleTheaterSystemChange}
              loading={loading}
            >
              {theaterSystems.map((system) => (
                <Option key={system.maHeThongRap} value={system.maHeThongRap}>
                  {system.tenHeThongRap}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Cụm rạp"
            name="theaterCluster"
            rules={[{ required: true, message: "Vui lòng chọn cụm rạp" }]}
          >
            <Select placeholder="Chọn cụm rạp" loading={loading}>
              {theaterClusters.map((cluster) => (
                <Option key={cluster.maCumRap} value={cluster.maCumRap}>
                  {cluster.tenCumRap}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Ngày chiếu & giờ chiếu"
            name="date"
            rules={[{ required: true, message: "Vui lòng chọn ngày chiếu" }]}
          >
            <DatePicker
              showTime
              format="DD/MM/YYYY HH:mm:ss"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Giá vé"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá vé" }]}
          >
            <InputNumber min={75000} step={5000} className="w-full" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Tạo lịch chiếu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
