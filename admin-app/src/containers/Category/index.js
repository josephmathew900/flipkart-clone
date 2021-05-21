import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import {
  IoIosCheckboxOutline,
  IoMdClipboard,
  IoMdArrowDown,
  IoMdArrowForward,
} from 'react-icons/io';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [checked, setChecked] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);
    dispatch(addCategory(form));
    setCategoryName('');
    setParentCategoryId('');
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckboxOutline />,
                uncheck: <IoMdClipboard />,
                halfCheck: <IoMdClipboard />,
                expandClose: <IoMdArrowForward />,
                expandOpen: <IoMdArrowDown />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>

      <Modal
        show={show}
        modalTitle={'Add New Category'}
        handleClose={handleClose}
      >
        <Input
          value={categoryName}
          placeholder={'Category Name '}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          value={parentCategoryId}
          className="form-control"
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </Modal>

      {/*Edit Categories */}
      <Modal
        show={updateCategoryModal}
        modalTitle={'Update Category'}
        handleClose={() => setUpdateCategoryModal(false)}
        size={'lg'}
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => {
            return (
              <Row>
                <Col>
                  <Input
                    value={item.name}
                    placeholder={'Category Name '}
                    onChange={(e) =>
                      handleCategoryInput(
                        'name',
                        e.target.value,
                        index,
                        'expanded'
                      )
                    }
                  />
                </Col>
                <Col>
                  <select
                    value={item.parentId}
                    className="form-control"
                    onChange={(e) =>
                      handleCategoryInput(
                        'parentId',
                        e.target.value,
                        index,
                        'expanded'
                      )
                    }
                  >
                    <option>select category</option>
                    {createCategoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select className="form-control">
                    <option value="">Select Type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                  </select>
                </Col>
              </Row>
            );
          })}
        <Row>
          <Col>
            <h6>Checked</h6>
          </Col>
        </Row>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => {
            return (
              <Row>
                <Col>
                  <Input
                    value={item.name}
                    placeholder={'Category Name '}
                    onChange={(e) =>
                      handleCategoryInput(
                        'name',
                        e.target.value,
                        index,
                        'checked'
                      )
                    }
                  />
                </Col>
                <Col>
                  <select
                    value={item.parentId}
                    className="form-control"
                    onChange={(e) =>
                      handleCategoryInput(
                        'parentId',
                        e.target.value,
                        index,
                        'checked'
                      )
                    }
                  >
                    <option>select category</option>
                    {createCategoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select className="form-control">
                    <option value="">Select Type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                  </select>
                </Col>
              </Row>
            );
          })}
      </Modal>
    </Layout>
  );
};

export default Category;
