import React, {Component} from 'react';
import LogoIcon from './logo.svg';
import './App.css';
import {
    Layout,
    Icon,
    Button,
    Input,
    Row,
    Col,
    Table,
} from 'antd'

const {Header, Content, Footer} = Layout

class App extends Component {
    //构造函数，在创建组件的时候调用一次。
    constructor(props) {
        super(props)
        this.state = {
            inputStr: "",
            iconLoading: false,
            contentLoading: false,
            error: null,
            data: null,
            total_count: 0
        }
    }
    // componentWillMount() {
    // //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次。 }
    // componentWillReceiveProps(nextProps) {
    // //props是父组件传递给子组件的。父组件发生render的时候子组件就会调用componentWillReceiveProps（不管props有没有更
    // 新 ，也不管父子组件之间有没有数据交换）。 } shouldComponentUpdate(nextProps, nextState) {
    // //组件挂载之后，每次调用setState后都会调用shouldComponentUpdate判断是否需要重新渲染组件。默认返回true，需要重新rend
    // e r。在比较复杂的应用里，有一些数据的改变并不影响界面展示，可以在这里做判断，优化渲染效率。 }
    // componentWillUpdate(nextProps, nextState) {
    // //shouldComponentUpdate返回true或者调用forceUpdate之后，componentWillUpdate会被调用。 }
    render() {
        const name = "关键词检索GitHub最受欢迎项目"
        const suffix = this.state.inputStr
            ? <Icon type="close-circle" onClick={this.emitEmpty}/>
            : null

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
                width: '30%'
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
                    <p>项目地址: {data.html_url}</p>
                    <p>项目描述: {data.description}</p>
                </div>
            );
        };
        return (
            <Layout>
                <Header className="antd-header">
                    <img src={LogoIcon} className="App-logo" alt="logo"/>
                    <span className="antd-header-h1">{name}</span>
                </Header>
                <Content className="antd-content">
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
                                    prefix={< Icon type = "search" />}
                                    onChange={this.onChangeInputForm}
                                    ref={node => this.inputForm = node}
                                    suffix={suffix}
                                    value={this.state.inputStr}
                                    onPressEnter={this.onClickSearch}/>
                            </Col>
                            <Col xs={6} sm={3}>
                                <Button
                                    type="primary"
                                    icon="search"
                                    loading={this.state.iconLoading}
                                    onClick={this.onClickSearch}>搜索</Button>
                            </Col>
                        </Row>
                        <Row type="flex" justify="end">
                            <Col xs={6} sm={3}>查找关键词为:
                            </Col>
                            <Col xs={4} sm={3}>
                                <span>{this.state.inputStr}</span>
                            </Col>
                            <Col xs={6} sm={3}>共找到结果:
                            </Col>
                            <Col xs={2} sm={1}>
                                <span>{this.state.total_count}</span>
                            </Col>
                            <Col xs={6} sm={4}>
                                项。显示前30项</Col>
                        </Row>
                        <Row type="flex" justify="center">
                            <Col><Table
                                dataSource={this.state.data}
                                columns={columns}
                                rowKey="id"
                                expandedRowRender={record => expandedRowRender(record)}
                                loading={this.state.contentLoading}/></Col>
                        </Row>
                    </div>
                </Content>
                <Footer className="antd-footer">
                    <p>The demo made by Chrison Chan.</p>
                    <p>Github: <a href="https://github.com/kelekexiao123">https://github.com/kelekexiao123</a></p>
                </Footer>
            </Layout>
        )
    }
    // componentDidMount() {     //在组件挂载之后调用一次。这个时候，子主键也都挂载好了，可以在这里使用refs。 }
    // componentDidUpdate() {
    // //除了首次render之后调用componentDidMount，其它render结束之后都是调用componentDidUpdate。 }

    emitEmpty = () => {
        this
            .inputForm
            .focus();
        this.setState({inputStr: ''});
    }
    onChangeInputForm = (e) => {
        this.setState({inputStr: e.target.value});
    }
    onClickSearch = () => {
        this.setState({iconLoading: true, contentLoading: true});
        fetch(`https://api.github.com/search/repositories?q=${this.state.inputStr}&sort=stars`).then(function (response) {
            console.log('json fetch success!')
            return response.json()
        }).then(value => {
            this.setState({contentLoading: false, iconLoading: false, data: value.items, total_count: value.total_count})
        }).catch(err => {
            this.setState({loading: false, error: err})
            console.log('json fetch failed', err)
        })
    }
}

App.defaultProps = {}

App.propTypes = {}

export default App;
