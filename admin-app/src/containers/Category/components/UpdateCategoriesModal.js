import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';

const UpdateCategoriesModel = (props) => {
  const {
    show,
    size,
    handleClose,
    modalTitle,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
  } = props;
  return (
    <Modal
      show={show}
      modalTitle={modalTitle}
      handleClose={handleClose}
      size={size}
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
                  {categoryList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      'type',
                      e.target.value,
                      index,
                      'expanded'
                    )
                  }
                  className="form-control"
                >
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
                  {categoryList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      'type',
                      e.target.value,
                      index,
                      'checked'
                    )
                  }
                  className="form-control"
                >
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

export default UpdateCategoriesModel;
