import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Input, message } from "antd";
import {
  DeleteOutlined,
  CalendarOutlined,
  SearchOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieList, deleteMovie } from "./slice";
import { useNavigate } from "react-router-dom";

export default function ListMoviePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const { movies, loading } = useSelector((state) => state.listmovieReducer);

  useEffect(() => {
    dispatch(fetchMovieList());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id))
      .unwrap()
      .then(() => message.success("Xóa phim thành công!"))
      .catch((errorMessage) => message.error(`${errorMessage}`));
  };

  const filteredMovies = movies?.filter((movie) =>
    movie.tenPhim.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      width: 90,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (src) => (
        <img
          src={src}
          alt="movie"
          className="rounded-md shadow-md object-cover w-2/4"
        />
      ),
      width: 100,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: 220,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      render: (text) => (text.length > 50 ? `${text.slice(0, 50)}...` : text),
      width: 250,
    },
    {
      title: "Hành động",
      key: "actions",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/edit-movie/${record.maPhim}`)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record.maPhim)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button
            icon={<CalendarOutlined />}
            style={{ color: "green", borderColor: "green" }}
            onClick={() => navigate(`/admin/show-time/${record.maPhim}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col p-5">
      <h2 className="text-left text-2xl font-bold pb-4">Danh Sách Phim</h2>

      <div className="flex justify-between items-center mb-4">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm phim..."
          size="middle"
          className="w-1/2 py-2 px-4 text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          size="middle"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold p-5 rounded-md"
          onClick={() => navigate("/admin/add-movie")}
        >
          Thêm Phim
        </Button>
      </div>

      <div className=" flex-grow overflow-auto">
        <Table
          dataSource={filteredMovies}
          columns={columns}
          rowKey="maPhim"
          loading={loading}
          bordered
          size="middle"
          className="w-full"
        />
      </div>
    </div>
  );
}
