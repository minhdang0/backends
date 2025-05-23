const success = (res, status, data, message) => {
  res.status(status).json({
    success: true,
    data,
    message,
  });
};
const error = (res, status, message, errors) => {
  if (status === 204) return res.status(204).send();

  res.status(status).json({
    success: false,
    message,
    errors,
  });
};

const paginate = (res, result, page, limit) => {
  const { items, total } = result;
  const lastPage = Math.ceil(total / limit);

  res.status(200).json({
    success: true,
    data: {
      items,
      pagination: {
        current_page: +page,
        per_page: limit,
        total,
        last_page: lastPage,
      },
    },
  });
};
const response = { success, error, paginate };
module.exports = response;
