import React, { Component } from 'react';
import { Icon, Button, Input, Row, Col, } from 'antd'

class SearchInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputStr: ''
        }
    }

    render() {
        const suffix = this.state.inputStr
            ? <Icon type="close-circle" onClick={this.emitEmpty} />
            : null
        return (
            <div className="antd-content-div">
                <Row type="flex" justify="end" gutter={10}>
                    <Col
                        xs={9}
                        sm={4}
                        style={{
                            textAlign: "center"
                        }}>请输入查找关键词:</Col>
                    <Col span={8}>
                        <Input
                            type="text"
                            placeholder="输入关键词"
                            prefix={< Icon type="search" />}
                            onChange={this.onChangeInputForm}
                            ref={node => this.inputForm = node}
                            suffix={suffix}
                            value={this.state.inputStr}
                            onPressEnter={this.onClickSearch} />
                    </Col>
                    <Col xs={6} sm={3}>
                        <Button
                            type="primary"
                            icon="search"
                            loading={this.props.searchLoading}
                            onClick={this.onClickSearch}>搜索</Button>
                    </Col>
                </Row>
                <Row type="flex" justify="end">
                    <Col xs={6} sm={3}>查找关键词为:</Col>
                    <Col xs={4} sm={2}>
                        <span>{this.state.inputStr}</span>
                    </Col>
                    <Col xs={6} sm={3}>搜索共找到结果:</Col>
                    <Col xs={2} sm={1}>
                        <span>{this.props.total_count}</span>
                    </Col>
                    <Col xs={6} sm={3}>项。显示前30项</Col>
                </Row>
            </div>
        )
    }

    emitEmpty = () => {
        this.inputForm.focus();
        this.setState({ inputStr: '' });
    }
    onChangeInputForm = (e) => {
        this.setState({ inputStr: e.target.value });
    }

    onClickSearch = () => {
        this.props.searchBegin(this.state.inputStr)
        // this.setState({inputStr: ''})
    }
}

SearchInput.propTypes = {}

export default SearchInput;
