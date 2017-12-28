import base from '../base';

function getRecommends() {
    return base.get('/recommend');
}

function getRecommend(id) {
    return base.get(`/recommend/single?id=${id}`);
}

function getRecommendByTypes(type) {
    return base.get(`/recommend/types?type=${type}`);
}

function getRecommendTypesCount() {
    return base.get(`/recommend/typeCount`);
}

export { getRecommends, getRecommend, getRecommendByTypes, getRecommendTypesCount };