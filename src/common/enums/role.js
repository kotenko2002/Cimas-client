export const Role = {
    'Worker': 1,
    'Reviewer': 2,
    'CompanyAdmin': 3,
}

export function RoleConverter(item) {
    switch (item) {
        case 1:
            return 'Worker';
        case 2:
            return 'Reviewer';
        case 3:
            return 'Company administrator';
        default:
            return -1;
    }
}