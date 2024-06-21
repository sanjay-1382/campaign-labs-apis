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
export const findOne = (model, filter = {}, options = {}) => {
    return model.findOne(filter, options)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Find multiple documents
export const findMany = (model, filter = {}, options = {}, sortValue = {}) => {
    return model.find(filter, options, sortValue)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// find multiple documents
export const findWithLimit = (model, filter = {}, options = {}, limit = 0) => {
    return model.find(filter, options).limit(limit)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// find multiple documents
export const findMaxValue = (model, filter = {}, options = {}, sortValue = {}) => {
    return model.find(filter, options, sortValue).limit(1)
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
export const aggregate = (model, filter = {}, options = {}) => {
    return model.aggregate(filter, options)
        .then(result => { return result; })
        .catch(error => { throw error; });
}

// Populate documents
export const populate = (model, filter = {}, options = {}, aggregateKey = {}) => {
    return model.find(filter, options,).populate(aggregateKey)
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