import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCategory,
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from '../../actions';
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
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

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
          category.children &&
          category.children.length > 0 &&
          renderCategories(category.children),
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
      if (category.children && category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
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

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
    });
    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });

    setUpdateCategoryModal(false);
  };

  const renderUpdateCategoriesModel = () => {
    return (
      <Modal
        show={updateCategoryModal}
        modalTitle={'Update Category'}
        handleClose={updateCategoriesForm}
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
    );
  };

  const renderAddCategoryModal = () => {
    return (
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
    );
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    dispatch(deleteCategoriesAction(idsArray)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
        setDeleteCategoryModal(false);
      } else {
      }
    });
  };

  const renderDeleteCategoryModal = () => {
    return (
      <Modal
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: 'No',
            color: 'primary',
            onClick: () => setDeleteCategoryModal(false),
          },
          {
            label: 'Yes',
            color: 'danger',
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
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
            <button onClick={deleteCategory}>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>

      {renderAddCategoryModal()}
      {renderUpdateCategoriesModel()}
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
