
// Adding Data from/in No-SQL Backend (Firestore)

-- Random Notes

1.  Updated the Shop-data.json with data. Renamed it to shop-data.js. 

2.  Temporarily initialized the products state in products provider as an empty array

3.  Went to firebase utils, created a method to allow uploading the shop data into firestore. To achieve this, we:

- import 'collection, writeBatch' from 'firebase/firestore'
- then we create the 'addCollectionAndDocuments' function

```
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    
    await batch.commit()
    console.log('done')
}
```

Note that the data could be different, so instead of directly passing in 'title' in the docRef, we could use a third argument, 'field', and then pass in 'field' instead for dynamic data

    --those two lines could then be these:

    const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field = 'title')
    const docRef = doc(collectionRef, object.field.toLowerCase());
    

Note: Transactions are basically records added or edited on a database. This is often done as a batch, that is a series of them that have to all be successful for that batch to be deemed successful; if any fails, it doesn't suceed. Read up on this

4.  We then go to our products provider, import the 'addCollectionAndDocuments' method, create a useEffect with it, passing in the 'categories and Shop Data' we want to add to the database

```
useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    })
```

NOTE: This is only a one-off thing, and therefore needs to be removed afterwards to prevent having to rewrite this every single time the code runs



// Fetching Data from the Firestore Backend

1.  We import two methods, 'query' and 'getDocs' from firestore.
2.  We then write the 'getCategoriesAndDocuments' function

```
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}
```

Study the above.

3.  We then go to the Product Provider file and import 'getCategoriesAndDocuments'
4.  We define the function within a useEffect:

```
useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
        }

        getCategoriesMap();
    }, [])
```

5.  We had to change the name of Products Context and Provider to Categories to reflect what it actually retrieves. We also had to refactor the code in places this was used/imported. Also note that the array ([]) in both files were changed to objects ({})

6.  With those setup, we then go to the Shop page where these ought to be rendered to make adjustments to the code. This retrieves the keys from the object in categoriesMap, mapping over each and returning title and product card. You can reference the database structure at the bottom of the shop page to understand the title mapping below better
            

```
{
                Object.keys(categoriesMap).map((title) => (
                    <Fragment key={title}>
                        <h2>{title}</h2>
                        <div className="products-container">
                            {categoriesMap[title].map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </Fragment>
                ))
            }
```


// Limiting the number of products showing on the Shop page (i.e showing a preview)

1.  We created a new component called 'category-preview' with its respective jsx and style files
2.  We then import the category preview component into the Shop page
3.  Because we want to use dynamic routing for the categories on the shop page (i.e to use url structures of https://website-domain.com/shop/...), we first declare a wildcard on the shop route defined in the App component. Then we set up a CategoriesPreview component in the routes folder, and moved the code above into it, then set that component as the index route to be displayed on the shop page.

Within the shop component, we can then set up other routes.

4.  We setup a new category component in the routes folder. Within the shop component, we define the routh and it's path. The path is usually a unique string, in this case, the category. This unique string is known as a "parameter", and employs the use of useParams hook within the component itself to access this value

```
    <Route path:":category" element={Category} />
```

5.  Within the category component, we import useParams.

We then destructure the category from the useParams() as so:
```
    const { category } = useParams();
```

we also need to access our categoriesMap from our CategoriesContext so we import this:

    const { categoriesMap }  useContext(CategoriesContext);

6.  We then end up with this as the final code within the return method. Please see the other codes within the Category component
```
<div className='category-product-container'>

            {/* the 'products &&' is required to prevent an error for when it initially renders. Since it is an empty array, 
                and the categoryMap is fetched async, it won't be fetched on first load, so we used this to ensure it renders after the product has been fetched.
            */}

            { products &&
                products.map((product) => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </div>
```

7.  We then fix styling issues if any; also added the title for each category page.