const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: __dirname + '/.env' });

// Supabase连接设置
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = process.env.PORT || 3003; // 更改端口以避免冲突

app.use(cors());
app.use(express.json());

// 托管前端静态文件
app.use(express.static(path.join(__dirname, '..')));

// 获取所有商品分类
app.get('/api/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id');

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: '获取分类失败' });
  }
});

// 根据ID获取特定分类
app.get('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: '分类不存在' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: '获取分类失败' });
  }
});

// 添加新分类
app.post('/api/categories', async (req, res) => {
  try {
    const { name, description } = req.body;
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name, description }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: '创建分类失败' });
  }
});

// 更新分类
app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const { data, error } = await supabase
      .from('categories')
      .update({ name, description })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: '分类不存在' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: '更新分类失败' });
  }
});

// 删除分类
app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: '删除分类失败' });
  }
});

// 获取所有商品
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name)
      `)
      .order('id');

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: '获取商品失败' });
  }
});

// 根据ID获取特定商品
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: '商品不存在' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: '获取商品失败' });
  }
});

// 添加新商品
app.post('/api/products', async (req, res) => {
  try {
    const productData = req.body;
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: '创建商品失败' });
  }
});

// 更新商品
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: '商品不存在' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: '更新商品失败' });
  }
});

// 删除商品
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: '删除商品失败' });
  }
});

// 获取所有用户
app.get('/api/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id');

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: '获取用户失败' });
  }
});

// 根据ID获取特定用户
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: '获取用户失败' });
  }
});

// 添加新用户
app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: '创建用户失败' });
  }
});

// 更新用户
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: '更新用户失败' });
  }
});

// 删除用户
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: '删除用户失败' });
  }
});

// 对于根路径请求，返回前端页面
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// 对于所有其他路径，也返回前端页面（支持前端路由）
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// 处理根路径
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// 处理所有其他路径（支持前端路由）
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});