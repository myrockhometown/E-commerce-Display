-- 创建商品分类表
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建用户表
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建商品表
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    image_url TEXT,
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入示例数据
INSERT INTO categories (name, description) VALUES 
    ('电子产品', '各类电子设备及配件'),
    ('服装', '男女装及配饰'),
    ('家居用品', '家庭日用品及装饰');

INSERT INTO users (email, name, role) VALUES 
    ('admin@store.com', '管理员', 'admin'),
    ('customer1@example.com', '张三', 'customer'),
    ('customer2@example.com', '李四', 'customer');
    
INSERT INTO products (name, description, price, category_id, stock_quantity) VALUES
    ('iPhone 15', '最新款苹果手机', 7999.00, 1, 50),
    ('MacBook Pro', '专业级笔记本电脑', 15999.00, 1, 20),
    ('休闲T恤', '纯棉舒适T恤', 99.00, 2, 100),
    ('牛仔裤', '经典款式牛仔裤', 299.00, 2, 80),
    ('陶瓷餐具套装', '精美家用陶瓷餐具', 199.00, 3, 30),
    ('床头灯', '温馨卧室床头灯', 129.00, 3, 40);