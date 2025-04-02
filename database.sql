-- Đảm bảo cột 'name' là duy nhất
ALTER TABLE products
ADD UNIQUE (name);

-- Đặt giá trị mặc định và ràng buộc CHECK cho cột 'price'
ALTER TABLE products
MODIFY price INT DEFAULT 0,
ADD CONSTRAINT chk_price CHECK (price >= 0);

-- Đặt giá trị mặc định và ràng buộc CHECK cho cột 'oldprice'
ALTER TABLE products
MODIFY oldprice INT DEFAULT 0,
ADD CONSTRAINT chk_oldprice CHECK (oldprice >= 0);

-- Đặt giá trị mặc định và ràng buộc CHECK cho cột 'quantity'
ALTER TABLE products
MODIFY quantity INT DEFAULT 0,
ADD CONSTRAINT chk_quantity CHECK (quantity >= 0);

-- Đặt giá trị mặc định và ràng buộc CHECK cho cột 'buyturn'
ALTER TABLE products
MODIFY buyturn INT DEFAULT 0,
ADD CONSTRAINT chk_buyturn CHECK (buyturn >= 0);
