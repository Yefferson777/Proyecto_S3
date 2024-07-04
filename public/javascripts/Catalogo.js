const apiurl = 'http://172.0.0.1:4000/api/servicios';

const getServicios = async () => {
    try {
        const response = await fetch(apiurl ); 
    
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.log('Fetch Error', error);
    }

};
getServicios();
