
import api from './Interceptor';


class RetrieveDocsService {

    getDocs = async () => {
        let url = 'api/nips_papers.json';
        return await api.get(url)
    }

}

export const RetrieveDocService= new RetrieveDocsService();
