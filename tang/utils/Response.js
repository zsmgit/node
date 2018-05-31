function  Response(status, data, remark) {
    this.status = status || 'failed';
    this.data = data || null;
    this.remark = remark || ''
}
module.exports = Response;

