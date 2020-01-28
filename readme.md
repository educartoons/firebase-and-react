### Adding security rules 

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
		
    match /posts/{postId}{
    	allow red;
      allow write: if request.auth.uid != null;
    }
    
  }
}
```


### Add security for deleting posts


```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
		
    match /posts/{postId}{
    	allow red;
      allow create, update: if request.auth.uid != null;
      allow delete: if request.auth.uid == resource.data.user.uid 
    }
    
  }
}
```

### Validation data 

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
		
    match /posts/{postId}{
    	allow read;
      allow create, update: if request.auth.uid != null && request.resource.data.title!='';
      allow delete: if request.auth.uid == resource.data.user.uid 
    }
    
  }
}
```