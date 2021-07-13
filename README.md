#__Devling Template Generator__

##Getting started

install Yeoman and generator-devling globally

```
npm install yo -g
npm install generator-devling -g
```


##How it works

To create the project template run the following

##devling
```

yo devling {AppName}

```
Where {AppName} is the name of the application

###Flags
```
--is-story  // specifies that the project 
            // will include storybook libs 
            // so it will copy relevant files

--src-dir {directory}   // in case the src files will 
                        // need to sit on a different 
                        // directory specifies the directory

--exclude-public    // flag if the public folder 
                    // should be excluded when 
                    // generating the project
```

##Controller
To create a controller run the following 

```
yo devling:ctrl {CtrlName}
```
Where {CtrlName} is the name of the controller

##Page
To create a page run the following 

```
yo devling:page {PageName}
```
Where {PageName} is the name of the page

###Flags
```
--add-reducer // this flag will also create a file Reducer.ts
```

##UI Component
To create a ui component run the following 

```
yo devling:ui {UiName}
```
Where {UiName} is the name of the ui component

###Flags
```
--folder {folderName}   // specify a folder name 
                        // under under components for files to be generated
                        // default value "ui"
```

##Presentation Component (Functional component)
To create a ui component run the following 

```
yo devling:pr {PrName}
```
Where {PrName} is the name of the functional component

###Flags
```
--folder {folderName}   // specify a folder name 
                        // under under components for files to be generated
                        // default value "ui"
```
