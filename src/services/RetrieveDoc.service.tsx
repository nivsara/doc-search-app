
import api from './Interceptor';


class RetrieveDocsService {

    getDocs = async (searchQueryParams?: any) => {
        // To be replaced with mock server
        // let url = 'api/papers.json';
        // return await api.get(url);
        let url = 'api/search';
        return await api.get(url, {params: searchQueryParams})
    }
}

export const RetrieveDocService= new RetrieveDocsService();
