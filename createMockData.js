const jsf = require('json-schema-faker');
const fs = require('fs');


jsf.extend('faker', () => require('faker'));

jsf.option({ 
    resolveJsonPath: true, 
    requiredOnly: false, 
    optionalsProbability: 0.1 
});

const bookSchema = {
    type: 'object',
    properties: {
        books: {
            type: 'array',
            minItems: 120,
            maxItems: 160,
            uniqueItems: true,
            items: {
                $ref: 'book',
            }
        },
    },
    required: ['books']
}

const refs = [
    {
        id: 'author',
        type: 'object',
        properties: {
            id: {
                type: 'string',
                faker: 'random.uuid'
            },
            firstName: {
                type: 'string',
                faker: 'name.firstName',
            },
            lastName: {
                type: 'string',
                faker: 'name.lastName',
            },
        },
        required: ['id', 'firstName', 'lastName']
    },
    {
        id: 'book',
        type: 'object',
        properties: {
            id: {
                type: 'string',
                faker: 'random.uuid',
            },
            author: {
                $ref: 'author',
            },
            title: {
                type: 'string',
                faker: 'lorem.sentence',
            },
            publicationDate: {
                type: 'string',
                faker: 'date.past',
            },
            cover: {
                type: 'string',
                faker: 'image.dataUri',
            },
            description: {
                type: 'string',
                faker: 'lorem.paragraphs',
            },
        },
        required: ['id', 'author', 'title', 'publicationDate', 'cover', 'description']
    },
];

jsf.resolve(bookSchema, refs).then((sample) => {
    fs.writeFile("sample_book_data.json", JSON.stringify(sample), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Mock data has been created");
        }
    });
}).catch((err) => console.log(err));
