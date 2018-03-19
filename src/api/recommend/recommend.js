import base from '../base';

function getRecommends(page) {
    return base.get(`/recommend?page=${page}`);
}

function getRecommend(id) {
    return base.get(`/recommend/single?id=${id}`);
}

function getRecommendByTypes(type,page) {
    return base.get(`/recommend/types?type=${type}&page=${page}`);
}

function getRecommendTypesCount() {
    return base.get(`/recommend/typeCount`);
}

function getRecommendsCount() {
    return base.get(`/recommend/count`);
}

export { getRecommends, getRecommend, getRecommendByTypes, getRecommendTypesCount, getRecommendsCount };