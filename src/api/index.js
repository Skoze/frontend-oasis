import service from '@/utils/service';
export async function uploadData(file) {
  return service.request({
    method: 'POST',
    url: '/administrator/uploadData',
    data: file,
  });
}

export async function getYearRange() {
  return service.request({
    method: 'GET',
    url: '/user/interval',
    async: true,
  });
}

export async function queryPaper(
  authors = '',
  institute = '',
  conference = '',
  keyword = '',
  startYear = -(2 ** 31),
  endYear = 2 ** 31 - 1
) {
  return service.request({
    method: 'GET',
    url: '/user/queryPaper',
    params: {
      authors,
      institute,
      conference,
      keyword,
      startYear,
      endYear,
    },
  });
}

export async function queryPaperDetail(DOI) {
  return service
    .request({
      method: 'GET',
      url: '/user/queryPaperDetail',
      params: {
        DOI,
      },
      async: true,
    })
    .then((data) => ({
      ...data,
      keywords: data.keywords[0] && data.keywords[0].name ? data.keywords : [],
    }));
}
export async function queryAuthorDetail(authorId) {
  return service.request({
    method: 'GET',
    url: '/user/queryAuthorDetail',
    params: {
      authorId,
    },
    async: true,
  });
}
export async function queryInstituteDetail(institutionId) {
  return service.request({
    method: 'GET',
    url: '/user/queryInstituteDetail',
    params: {
      institutionId,
    },
    async: true,
  });
}
export async function queryConferenceDetail(conferenceId) {
  return service.request({
    method: 'GET',
    url: '/user/queryConferenceDetail',
    params: {
      conferenceId,
    },
    async: true,
  });
}
export async function queryResearchDirectionDetail(researchDirectionId) {
  return service.request({
    method: 'GET',
    url: '/user/queryResearchDirectionDetail',
    params: {
      researchDirectionId,
    },
    async: true,
  });
}

export async function paperRanking(sort) {
  return service.request({
    method: 'GET',
    url: '/user/trend/paperTrend',
    params: {
      sort,
    },
  });
}
export async function authorRanking(sort) {
  return service.request({
    method: 'GET',
    url: '/user/trend/authorTrend',
    params: {
      sort,
    },
  });
}
export async function institutionRanking(sort) {
  return service.request({
    method: 'GET',
    url: '/user/trend/instituteTrend',
    params: {
      sort,
    },
  });
}
export async function researchDirectionRanking(sort) {
  return service.request({
    method: 'GET',
    url: '/user/trend/researchHotSpots',
    params: {
      sort,
    },
  });
}

export async function getSegmentation(type, percentage) {
  return service.request({
    method: 'GET',
    url: '/user/segmentation',
    params: {
      type,
      percentage,
    },
  });
}

export async function fetchDataFromIEEE({ conference, start, end }) {
  return service.request({
    method: 'POST',
    url: '/administrator/crawlData',
    params: {
      conference,
      start,
      end,
    },
  });
}
