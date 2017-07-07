import React, { Component } from 'react';
import { Row, Col, Table, } from 'antd'

class SearchGrid extends Component {
    //构造函数，在创建组件的时候调用一次。
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        // name : "freeCodeCamp", stargazers_count : 290905, forks_count : 12323,
        // open_issues_count : 521, created_at : "2014-12-24T17:49:19Z", updated_at :
        // "2017-07-02T04:03:17Z", html_url :
        // "https://github.com/freeCodeCamp/freeCodeCamp", description : "The
        // https://freeCodeCamp.com open source codebase and curriculum. Learn to code
        // and help nonprofits.", language : "JavaScript"
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: '10%'
            }, {
                title: '项目名',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                render: (text, record) => (
                    <span>
                        <a href={record.html_url} target="_blank">{record.name}</a>
                    </span>
                ),
            }, {
                title: 'star数',
                dataIndex: 'stargazers_count',
                key: 'stargazers_count',
                width: '15%',
                sorter: (a, b) => a.stargazers_count - b.stargazers_count
            }, {
                title: 'fork次数',
                dataIndex: 'forks_count',
                key: 'forks_count',
                width: '15%',
                sorter: (a, b) => a.forks_count - b.forks_count
            }, {
                title: 'issue数',
                dataIndex: 'open_issues_count',
                key: 'open_issues_count',
                width: '15%',
                sorter: (a, b) => a.open_issues_count - b.open_issues_count
            }, {
                title: '语言',
                dataIndex: 'language',
                key: 'language',
                width: '15%'
            }
        ];

        const expandedRowRender = (data) => {
            return (
                <div>
                    <p>创建时间: {data.created_at}</p>
                    <p>最近更新时间: {data.updated_at}</p>
                    <p>项目地址: <a href={data.html_url} target="_blank">{data.html_url}</a></p>
                    <p>项目描述: {data.description}</p>
                </div>
            );
        };
        return (
            <Row type="flex" justify="center">
                <Col><Table
                    dataSource={this.props.data}
                    columns={columns}
                    rowKey="id"
                    expandedRowRender={record => expandedRowRender(record)}
                    loading={this.props.searchLoading} /></Col>
            </Row>
        )
    }

}

SearchGrid.propTypes = {}

export default SearchGrid;
