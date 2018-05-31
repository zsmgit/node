class PageBean {
    
    // constructor
    constructor(currentPage, pageSize) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
    }
    calcBeginPage(){
        return (this.currentPage-1) * this.pageSize + 1;
    }
}

module.exports = PageBean;