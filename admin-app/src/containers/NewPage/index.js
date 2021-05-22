import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import linearCategories from '../../helpers/linearCategories';

const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState('');
  const [products, setProducts] = useState('');
  const category = useSelector((state) => state.category);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  const handleBannerImages = (e) => {};

  const handleProductImages = (e) => {};

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={'Create New Page'}
        handleClose={() => setCreateModal(false)}
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Page Title'}
                className="form-control-sm"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={'Page Description'}
                className="form-control-sm"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <input
                className="form-control form-control-sm"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <input
                className="form-control form-control-sm"
                type="file"
                name="products"
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      {renderCreatePageModal()}{' '}
      <button onClick={() => setCreateModal(true)}>Create Page</button>
    </Layout>
  );
};

export default NewPage;
