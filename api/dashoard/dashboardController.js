import asyncHandler from 'express-async-handler';
import moment from 'moment';

// @desc    Fetch all dashboards
// @route   GET /api/dashboards
// @access  Public
const getDashboards = asyncHandler(async (req, res) => {
  try {
    let searchParams = {};

    if (req.query.conditional) {
      const conditionalQ = req.query.conditional;

      searchParams = { ...searchParams, ...conditionalQ };
    }

    let newSearchParams = {};

    if (searchParams.createdAt) {
      newSearchParams.createdAt = {};
      if (searchParams.createdAt['$gte']) {
        newSearchParams.createdAt['$gte'] = new Date(
          searchParams.createdAt['$gte']
        );
      }
      if (searchParams.createdAt['$lte']) {
        newSearchParams.createdAt['$lte'] = new Date(
          searchParams.createdAt['$lte']
        );
      }
    }
    if (req.user && req.user.role === 'VENDOR') {
      newSearchParams['vendor'] = req.user._id;
    }

    if (req.user && req.user.role === 'VENDOR') {
      searchParams['vendor'] = req.user._id;
    }

    const total_orders = await Order.countDocuments({ ...searchParams });
    const total_products = await Product.countDocuments({ ...searchParams });
    const order_status_array = await Order.aggregate([
      { $match: { ...newSearchParams } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const order_total = await Order.aggregate([
      { $match: { ...newSearchParams } },
      { $group: { _id: null, total: { $sum: '$total_amount' } } },
    ]);
    const order_total_stats = await Order.aggregate([
      { $match: { ...newSearchParams } },
      { $group: { _id: '$status', total: { $sum: '$total_amount' } } },
    ]);

    const orders = await Order.find({ ...searchParams })
      .limit(10)
      .sort({
        createdAt: -1,
      });

    const product_status_array = await Product.aggregate([
      { $match: { ...newSearchParams } },
      {
        $group: {
          _id: '$product_status',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      total_orders,
      total_products,
      order_status_array,
      order_total,
      order_total_stats,
      orders,
      product_status_array: product_status_array
    });
  } catch (error) {
    console.log(error);
    res.status(502);
    throw new Error('Something Went wrong');
  }
});

export { getDashboards };
