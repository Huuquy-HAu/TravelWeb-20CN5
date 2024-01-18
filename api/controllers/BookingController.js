const Booking = require("../models/Booking")

exports.newBooking = async (req, res) => {
  try {
    const { tourId, price, startDate } = req.body;
    const userId = req.user._id;
    const existingBooking = await Booking.findOne({
      idTour: tourId,
      idUser: userId,
      startDate: startDate,
    });

    console.log(existingBooking);
    if (existingBooking && existingBooking.isApproved == 1) {
      return res.status(400).json({ message: "Bạn đã đặt chuyến đi này rồi , Hãy chờ xác nhận của hệ thống" });
    }
    const newBooking = await Booking.create({
      idTour: tourId,
      idUser: userId,
      price: price,
      startDate: startDate,
      isApproved: 1,
    });
    res.status(200).json({ message: "Đặt chuyến đi thành công , hãy chờ xác nhận", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
exports.ApproveBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { statusBooking, idUser, idTour } = req.body;

    const existingBooking = await Booking.findOneAndUpdate(
      {
        idTour: idTour,
        idUser: idUser
      },
      { $set: { isApproved: statusBooking } },
      { new: true } // để nhận đối tượng đã cập nhật
    );
    console.log(existingBooking);
    // if (!existingBooking) {
    //     return res.status(404).json({ message: 'Không tìm thấy đợt đặt' });
    // }
    // if (existingBooking.isApproved !== 1) {
    //     return res.status(400).json({ message: 'Chỉ có thể thao tác khi tour đang chờ duyệt' });
    // }

    // await bookingId.findByIdAndUpdate(bookingId, { isApproved: statusBooking });

    res.status(200).json({ message: 'Booking approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user || user.role !== 2) {
      return res.status(403).json({ message: "Permission denied" });
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.isApproved === 1) {
      await Booking.findByIdAndUpdate(bookingId, { isApproved: 0 });// Nếu booking ở trạng thái chờ xét duyệt, có thể xóa 
      res.status(200).json({ message: "Booking canceled successfully" });
    } else if (booking.isApproved === 2) {
      if (user.role === 1) {
        return res.status(403).json({ message: "Permission denied" });// Nếu là user bình thường, không thể xóa
      } else if (user.role === 2) {
        await Booking.findByIdAndUpdate(bookingId, { isApproved: 0 });// Nếu là admin, có thể xóa
        res.status(200).json({ message: "Booking marked as deleted by admin" });
      }
    } else {
      res.status(400).json({ message: "Invalid action for booking in current state" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

exports.getAllBooking = async (req, res) => {
  try {
    const booking = await Booking.find().populate('idTour').populate('idUser')
    return res.status(200).json({ message: 'oke', data: booking })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error', error })
  }
}

exports.getOneBooking = async (req, res) => {

}

exports.getBookingForUser = async (req, res) => {
  try {
    const userID = req.user._id
    const booking = await Booking.find({ idUser:userID }).populate('idTour').populate('idUser')
    return res.status(200).json({ message: 'oke', data: booking })
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error })
  }
}