export default function Movie() {
  return (
    <div className="w-1/3 space-y-5 text-white mt-5">
      <h2 className="text-3xl font-bold">BÍ KÍP LUYỆN RỒNG</h2>
      <p>Đạo diễn: Dean DeBlois</p>
      <p>Diễn viên: Mason Thames, Nico Parker, Gerard Butler</p>
      <p>Thể loại: Hài, Hành Động, Phiêu Lưu, Thần thoại</p>
      <p className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V2.77h1.077V5h7.154V2.77h1V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.769q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192"
          />
        </svg>
        <span>13 - 06 - 2025</span>
      </p>
      <p>Ngôn ngữ: Tiếng Anh – Phụ đề, lồng tiếng Việt</p>
      <p>
        Câu chuyện về một chàng trai trẻ với ước mơ trở thành thợ săn rồng,
        nhưng định mệnh lại đưa đẩy anh đến tình bạn bất ngờ với một chú rồng.
      </p>
    </div>
  );
}
