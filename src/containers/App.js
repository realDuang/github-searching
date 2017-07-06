import React, { Component } from 'react';
import LogoIcon from '../assets/logo.svg';
import '../style/App.css';
import { Layout } from 'antd'
import SearchInput from '../components/search/SearchInput'
import SearchGrid from '../components/search/SearchGrid'
const { Header, Content, Footer } = Layout

class App extends Component {
    //构造函数，在创建组件的时候调用一次。
    constructor(props) {
        super(props)
        this.state = {
            inputStr: '',
            searchLoading: false,
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
        const { searchLoading, total_count, data, error } = this.state
        return (
            <Layout>
                <Header className="antd-header">
                    <img src={LogoIcon} className="App-logo" alt="logo" />
                    <span className="antd-header-h1">{name}</span>
                </Header>
                <Content className="antd-content">
                    <SearchInput searchLoading={searchLoading} total_count={total_count} searchBegin={this.searchBegin}></SearchInput>
                    <SearchGrid data={data} error={error} searchLoading={searchLoading}></SearchGrid>
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

    searchBegin = (searchStr) => {
        this.setState({ searchLoading: true })
        fetch(`https://api.github.com/search/repositories?q=${searchStr}&sort=stars`).then(function (response) {
            console.log('json fetch success!')
            return response.json()
        }).then(value => {
            this.setState({ searchLoading: false, data: value.items, total_count: value.total_count })
        }).catch(err => {
            this.setState({ searchLoading: false, error: err })
            console.log('json fetch failed', err)
        })
    }

}

App.propTypes = {}

export default App;
