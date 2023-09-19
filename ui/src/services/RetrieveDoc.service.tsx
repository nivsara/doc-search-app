
import api from './Interceptor';


class RetrieveDocsService {

    getDocs = async (searchQueryParams?: any) => {
        let url = 'api/search';
        return await api.get(url, {params: searchQueryParams})
    }
}

export const RetrieveDocService= new RetrieveDocsService();
