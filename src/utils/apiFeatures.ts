import { Query } from "mongoose";

class APIFeatures {
  constructor(
    public query: Query<any[], any, {}, any>,
    public queryString: any
  ) {}

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Filter by time period
    if (queryObj.startDate && queryObj.endDate) {
      //get time frame from request and format appropirately
      const startDateParam = queryObj.startDate;
      const endDateParam = queryObj.endDate;

      let startDate = null;
      let endDate = null;

      // Split the parameters into day, month, and year
      const [startDay, startMonth, startYear] = startDateParam.split(",");
      const [endDay, endMonth, endYear] = endDateParam.split(",");

      // Create the Date instances
      startDate = new Date(`${startMonth} ${startDay}, ${startYear}`);
      endDate = new Date(`${endMonth} ${endDay}, ${endYear}`);

      // Adjust endDate to include the full day
      endDate.setDate(endDate.getDate() + 1);

      queryObj.createdAt = {
        gte: startDate,
        lte: endDate,
      };

      delete queryObj.startDate;
      delete queryObj.endDate;
    }

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = queryStr.replace(/-/g, ".");

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  search() {
    if (this.queryString.search) {
      let searchKey = this.queryString.search;
      //make the search key case-insensitive
      searchKey = searchKey.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      this.query = this.query.find({ $text: { $search: searchKey } });
    } else {
      this.query = this.query.find();
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    const excludedFields = "-__v";
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
      this.query = this.query.select(excludedFields);
    } else {
      this.query = this.query.select(excludedFields);
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export { APIFeatures };
