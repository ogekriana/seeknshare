// import { Injectable } from '@angular/core';
// import { DataSource } from '@angular/cdk/collections';
// import { BehaviorSubject, merge, Observable } from 'rxjs';

// import { Role } from './../shared/models/role.model';
// import { RoleService } from './role.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class DatasourceService extends DataSource<any>{
// 	_filterChange = new BehaviorSubject('');

// 	get filter(): string {
// 	    return this._filterChange.value;
// 	}

// 	set filter(filter: string) {
// 	    this._filterChange.next(filter);
// 	}

// 	filteredData: Role[] = [];
// 	renderedData: Role[] = [];

// 	constructor(public _exampleDatabase: RoleService,
// 	              public _paginator: MatPaginator,
// 	              public _sort: MatSort) {
// 	    super();
// 	    // Reset to the first page when the user changes the filter.
// 	    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
// 	}

// 	  /** Connect function called by the table to retrieve one stream containing the data to render. */
// 	connect(): Observable<Role[]> {
// 	    // Listen for any changes in the base data, sorting, filtering, or pagination
// 	    const displayDataChanges = [
// 	      this._exampleDatabase.dataChange,
// 	      this._sort.sortChange,
// 	      this._filterChange,
// 	      this._paginator.page
// 	    ];

// 	    this._exampleDatabase.getAllSharingLv();


// 	    return merge(...displayDataChanges).pipe(map( () => {
// 	        // Filter data
// 	        this.filteredData = this._exampleDatabase.data.slice().filter((sharingLv: SharingLv) => {
// 	          const searchStr = (sharingLv.id + sharingLv.grade + sharingLv.sharingLevel).toLowerCase();
// 	          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
// 	        });

// 	        // Sort filtered data
// 	        const sortedData = this.sortData(this.filteredData.slice());

// 	        // Grab the page's slice of the filtered sorted data.
// 	        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
// 	        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
// 	        return this.renderedData;
// 	      }
// 	    ));
// 	}

// 	disconnect() { }

// 	  /** Returns a sorted copy of the database data. */
// 	sortData(data: SharingLv[]): SharingLv[] {
// 	    if (!this._sort.active || this._sort.direction === '') {
// 	      return data;
// 	    }

// 	    return data.sort((a, b) => {
// 	      let propertyA: number | string = '';
// 	      let propertyB: number | string = '';

// 	      switch (this._sort.active) {
// 	        // case 'id': [propertyA, propertyB] = [a._id, b._id]; break;
// 	        case 'grade': [propertyA, propertyB] = [a.grade, b.grade]; break;
// 	        case 'sharinglevel': [propertyA, propertyB] = [a.sharingLevel, b.sharingLevel]; break;
// 	        // case 'url': [propertyA, propertyB] = [a.url, b.url]; break;
// 	        // case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
// 	        // case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
// 	      }

// 	      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
// 	      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

// 	      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
// 	    });
// 	}
// }
