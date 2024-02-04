import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload"


describe('Pruebas en el fileUpload', () => { 
    test('should upload the file to cloudinary correctly', async () => { 
        const imageUrl = "https://media.istockphoto.com/id/583809524/es/foto/desierto-de-alberta-cerca-de-banff.jpg?s=612x612&w=0&k=20&c=mvDownbgLZRz1Wci6yV68NRRngqWNrl_lRF6QtrdJkw="
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();

        const file = new File([blob], 'landscape.jpg');
        const url = await fileUpload(file);

        expect( typeof url ).toBe('string');
    })    
    test('should return null if not file', async () => { 

        const file = new File([], 'landscape.jpg');
        const url = await fileUpload(file);

        expect( url ).toBe(null);
    })    
})