exports.formatPaginatedResponse = (page, limit, count, rows) => {
    return {
        success: true,
        message: 'Lấy danh sách thành công!',
        current_page: page,
        total_page: Math.ceil(count / limit),
        limit: limit,
        total: count,
        data: rows,
    };
};
