// Create one document
export const create = (model, data) => {
    return model.create(data)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Count documents
export const count = (model, filter = {}) => {
    return model.countDocuments(filter)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Find a single document by query
export const findOne = (model, filter = {}) => {
    return model.findOne(filter)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Find multiple documents
export const findMany = (model, filter = {}, sortValue = {}) => {
    return model.find(filter, sortValue)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// find multiple documents
export const findWithLimit = (model, filter = {}, limit = 0) => {
    return model.find(filter).limit(limit)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// find multiple documents
export const findMaxValue = (model, filter = {}, sortValue = {}) => {
    return model.find(filter, sortValue).limit(1)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Update single document and return updated document
export const updateOne = (model, filter = {}, data, options = { new: true }) => {
    return model.findOneAndUpdate(filter, data, options)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Update multiple documents and return modified count
export const updateMany = (model, filter = {}, data) => {
    return model.updateMany(filter, data)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Delete single document and return deleted document
export const deleteOne = (model, filter = {}, options = { new: true }) => {
    return model.findOneAndDelete(filter, options)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Delete multiple documents and return deleted count
export const deleteMany = (model, filter = {}) => {
    return model.deleteMany(filter)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Aggregate documents
export const aggregate = (model, filter = {}) => {
    return model.aggregate(filter)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Populate documents
export const populate = (model, filter = {}, aggregateKey = {}, sortValue = {}) => {
    return model.find(filter, sortValue).populate(aggregateKey)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// find documents with pagination
export const paginate = (model, filter = {}, options = {}) => {
    return model.paginate(filter, options)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Find multiple documents with pagination
export const findWithPagination = (model, filter = {}, options = {}) => {
    const { page = 1, limit = 10, sort = {} } = options;
    const skip = (page - 1) * limit;
    return model.find(filter).sort(sort).skip(skip).limit(limit)
        .then(result => { return result; })
        .catch(error => { throw error; });
}