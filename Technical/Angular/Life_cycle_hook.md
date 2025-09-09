Component Creation
    |
    | --> constructor()
    |       (Dependency Injection)
    |
    V
[ Input bindings set for the first time ]
    |
    V
    ngOnChanges() (only if @Input properties exist)
    |
    V
    ngOnInit()
    |
    V
    ngDoCheck()
    |
    V
[ Content Projection happens ]
    |
    V
    ngAfterContentInit()
    |
    V
    ngAfterContentChecked()
    |
    V
[ Component's View & Child Views Initialized ]
    |
    V
    ngAfterViewInit()
    |
    V
    ngAfterViewChecked()
    |
    |   (Repeat ngOnChanges, ngDoCheck, ngAfterContentChecked, ngAfterViewChecked
    |    whenever inputs change or change detection runs)
    V
Component Destruction
    |
    V
    ngOnDestroy()