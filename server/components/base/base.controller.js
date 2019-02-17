class BaseController {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return this.model.create(data);
    }
    get(filter, populate = '', select = '', sort = '', skip = '', limit = '') {
        return this.model
            .find(filter)
            .populate(populate)
            .select(select)
            .sort(sort)
            .skip(skip)
            .limit(limit);
    }
    update(filter, data) {
        return this.model.findByIdAndUpdate(filter._id, data, {
            new: true,
        });
    }
    delete(filter) {
        return this.model.remove(filter);
    }
    count(filter) {
        return this.model.countDocuments(filter);
    }
}

module.exports = BaseController;
